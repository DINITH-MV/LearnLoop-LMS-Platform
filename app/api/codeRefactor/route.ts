import { NextResponse } from 'next/server';

// Refactoring functions converted from Python
function renameVariable(code: string, oldName: string, newName: string): [string, string] {
  const regex = new RegExp(`\\b${oldName}\\b`, 'g');
  return [code.replace(regex, newName), "Rename Variable/Method"];
}

function extractMethod(code: string, methodName: string, blockCode: string): [string, string] {
  const newMethod = `public int ${methodName}() {\n${blockCode}\n}\n`;
  const refactoredCode = code.replace(blockCode.trim(), `${methodName}()`);
  const classEndIndex = refactoredCode.lastIndexOf('}');
  const result = refactoredCode.slice(0, classEndIndex) + newMethod + refactoredCode.slice(classEndIndex);
  return [result, "Extract Method"];
}

function replaceMagicNumber(code: string, number: string, constantName: string): [string, string] {
  const constantDeclaration = `public static final int ${constantName} = ${number};\n`;
  const numberRegex = new RegExp(`\\b${number}\\b`, 'g');
  let updatedCode = code.replace(numberRegex, constantName);
  const classStartIndex = updatedCode.indexOf('{') + 1;
  updatedCode = updatedCode.slice(0, classStartIndex) + '\n' + constantDeclaration + updatedCode.slice(classStartIndex);
  return [updatedCode, "Replace Magic Number with Constant"];
}

function simplifyConditionals(code: string, condition: string, methodName: string): [string, string] {
  const methodCode = `private boolean ${methodName}() {\n    return ${condition};\n}\n`;
  const refactoredCode = code.replace(condition, `${methodName}()`);
  const classEndIndex = refactoredCode.lastIndexOf('}');
  const result = refactoredCode.slice(0, classEndIndex) + methodCode + refactoredCode.slice(classEndIndex);
  return [result, "Simplify Conditionals"];
}

function applyRefactoringRules(code: string): [string, string[]] {
  const appliedRules: string[] = [];
  let refactoredCode = code;

  try {
    // Apply rename variable
    const [renamedCode, renameRule] = renameVariable(refactoredCode, "total", "sum");
    refactoredCode = renamedCode;
    appliedRules.push(renameRule);

    // Apply extract method
    const loopCode = `int sum = 0;
for (int i = 0; i < 10; i++) {
    sum += i;
}`;
    
    if (refactoredCode.includes("for (int i = 0; i < 10; i++)")) {
      const [extractedCode, extractRule] = extractMethod(refactoredCode, "calculateSum", loopCode);
      refactoredCode = extractedCode;
      appliedRules.push(extractRule);
    }

    // Apply replace magic number
    const [magicNumberCode, magicRule] = replaceMagicNumber(refactoredCode, "10", "MAX_COUNT");
    refactoredCode = magicNumberCode;
    appliedRules.push(magicRule);

    // Apply simplify conditionals
    if (refactoredCode.includes("sum > 50")) {
      const [conditionalCode, conditionalRule] = simplifyConditionals(refactoredCode, "sum > 50", "isLargeSum");
      refactoredCode = conditionalCode;
      appliedRules.push(conditionalRule);
    }

    return [refactoredCode, appliedRules];
  } catch (error) {
    return [code, [`Error during refactoring: ${error}`]];
  }
}

export async function POST(req: Request) {
  try {
    const { javaCode } = await req.json();

    if (!javaCode) {
      return NextResponse.json({ error: 'Java code is required' }, { status: 400 });
    }

    const [refactoredCode, appliedRules] = applyRefactoringRules(javaCode);

    return NextResponse.json({ 
      refactoredCode,
      appliedRules 
    }, { status: 200 });

  } catch (error) {
    console.error('Refactoring error:', error);
    return NextResponse.json({ 
      error: 'Failed to refactor code' 
    }, { status: 500 });
  }
}

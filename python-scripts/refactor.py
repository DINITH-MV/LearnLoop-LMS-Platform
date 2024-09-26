import re
import gradio as gr
import sys

# Refactoring Rules

def rename_variable(code, old_name, new_name):
    return re.sub(rf'\b{old_name}\b', new_name, code), "Rename Variable/Method"

def extract_method(code, method_name, block_code):
    new_method = f"public int {method_name}() {{\n{block_code}\n}}\n"
    refactored_code = re.sub(re.escape(block_code.strip()), f"{method_name}()", code)
    class_end_index = refactored_code.rfind('}')
    refactored_code = refactored_code[:class_end_index] + new_method + refactored_code[class_end_index:]
    return refactored_code, "Extract Method"

def inline_method(code, method_name):
    method_pattern = rf'public .* {method_name}\(\) {{(.*?)}}'
    method_body = re.search(method_pattern, code, re.DOTALL)
    if method_body:
        method_body = method_body.group(1).strip()
        code = re.sub(rf'{method_name}\(\);', method_body, code)
        code = re.sub(method_pattern, '', code)
    return code, "Inline Method"

def replace_magic_number(code, number, constant_name):
    constant_declaration = f"public static final int {constant_name} = {number};\n"
    code = re.sub(rf'\b{number}\b', constant_name, code)
    class_start_index = code.find('{') + 1
    code = code[:class_start_index] + '\n' + constant_declaration + code[class_start_index:]
    return code, "Replace Magic Number with Constant"

def simplify_conditionals(code, condition, method_name):
    method_code = f"private boolean {method_name}() {{\n    return {condition};\n}}\n"
    refactored_code = code.replace(condition, f"{method_name}()")
    class_end_index = refactored_code.rfind('}')
    refactored_code = refactored_code[:class_end_index] + method_code + refactored_code[class_end_index:]
    return refactored_code, "Simplify Conditionals"

# Applying all refactoring rules
def apply_refactoring_rules(code, enable_rename_variable=True, enable_extract_method=True, enable_replace_magic_number=True, enable_simplify_conditionals=True):
    applied_rules = []
    refactored_code = code

    try:
        if enable_rename_variable:
            refactored_code, rule = rename_variable(refactored_code, "total", "sum")
            applied_rules.append(rule)
        
        loop_code = """
int sum = 0;
for (int i = 0; i < 10; i++) {
    sum += i;
}
"""
        if enable_extract_method:
            refactored_code, rule = extract_method(refactored_code, "calculateSum", loop_code)
            applied_rules.append(rule)

        if enable_replace_magic_number:
            refactored_code, rule = replace_magic_number(refactored_code, "10", "MAX_COUNT")
            applied_rules.append(rule)

        if enable_simplify_conditionals:
            refactored_code, rule = simplify_conditionals(refactored_code, "sum > 50", "isLargeSum")
            applied_rules.append(rule)

    except Exception as e:
        return code, f"Error during refactoring: {e}"

    return refactored_code, applied_rules

# Refactor the code and return it along with applied rules
def refactor_code(java_code, rename_var=True, extract_method=True, replace_magic_num=True, simplify_cond=True):
    refactored_code, applied_rules = apply_refactoring_rules(java_code, rename_var, extract_method, replace_magic_num, simplify_cond)
    rules_used = "\n".join(f"- {rule}" for rule in applied_rules) if applied_rules else "No rules applied."
    return refactored_code, f"**Refactoring Methods**\n\n{rules_used}"

# Gradio Interface
if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Command-line mode: read from a file
        file_path = sys.argv[1]
        with open(file_path, 'r') as file:
            java_code = file.read()
        refactored_code, applied_rules = apply_refactoring_rules(java_code)
        print(refactored_code)
    else:
        # Gradio GUI mode
        interface = gr.Interface(
            fn=refactor_code,
            inputs=[
                gr.Textbox(label="Java Code", placeholder="Enter your Java code here", lines=15),
                gr.Checkbox(label="Rename Variables/Methods", value=True),
                gr.Checkbox(label="Extract Method", value=True),
                gr.Checkbox(label="Replace Magic Numbers", value=True),
                gr.Checkbox(label="Simplify Conditionals", value=True)
            ],
            outputs=[gr.Textbox(label="Refactored Code", lines=15), gr.Markdown(label="Rules Applied")],
            title="Java Code Refactoring Tool",
            description="This tool automatically applies various code refactoring techniques to your Java code and displays the rules used."
        )
        interface.launch()

import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
  const { javaCode } = await req.json();

  // Path to the Python script
  const scriptPath = path.join(process.cwd(), 'python-scripts', 'refactor.py');

  // Create a temporary file to store the Java code
  const tempFilePath = path.join(process.cwd(), 'temp', 'java_code.txt');
  fs.writeFileSync(tempFilePath, javaCode);

  return new Promise((resolve) => {
    // Run the Python script, passing the file path as an argument
    exec(`python ${scriptPath} ${tempFilePath}`, (error, stdout, stderr) => {
      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);

      console.log(stdout)

      if (error) {
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ refactoredCode: stdout }, { status: 200 }));
      }
    });
  });
}

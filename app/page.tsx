// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the desired route
  redirect('/Home');
  // This line is technically unreachable, but required to satisfy the component return type
  return null;
}

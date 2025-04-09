import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  const res = await fetch('http://localhost:1337/api/auth/local/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });

  const user = await res.json();

  if (res.ok) {
    return NextResponse.json({ user });
  } else {
    return NextResponse.json({ error: user.message }, { status: 400 });
  }
}

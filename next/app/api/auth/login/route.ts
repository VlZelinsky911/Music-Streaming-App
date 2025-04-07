import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  const res = await fetch('http://localhost:1337/api/auth/local', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			identifier: data.email,
			password: data.password,
		}),
	});	

  const user = await res.json();

  if (res.ok) {
    const token = user.jwt;
    return NextResponse.json({ token, user });
  } else {
    return NextResponse.json({ error: user.message }, { status: 400 });
  }
}

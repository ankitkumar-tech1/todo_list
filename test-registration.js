const testRegistration = async () => {
  try {
    console.log('🔄 Testing registration API...');

    const response = await fetch('http://localhost:5002/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Registration successful:', data);
    } else {
      console.log('❌ Registration failed:', data);
    }

  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testRegistration();
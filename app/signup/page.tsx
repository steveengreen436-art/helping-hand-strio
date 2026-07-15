const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage('Error: ' + error.message);
      else router.push('/dashboard');
    } else {
      // Sign Up Logic
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        setMessage('Auth Error: ' + error.message);
      } else if (data.user) {
        // Get Location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
          
          // Attempt to create profile record
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user!.id, full_name: fullName, location: loc }
          ]);
          
          if (profileError) {
            console.error('Profile Insert Error:', profileError);
            setMessage('Account created, but failed to save profile: ' + profileError.message);
          } else {
            setMessage('Account created! Please log in.');
          }
        }, (err) => {
          setMessage('Location required for signup. Please enable it in your browser.');
        });
      }
    }
  };

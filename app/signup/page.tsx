const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage('Error: ' + error.message);
      else router.push('/dashboard');
    } else {
      // We pass the extra data (full name) into the metadata during signup
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone // Pass the phone number here if you want it saved
          }
        }
      });
      
      if (error) {
        setMessage('Auth Error: ' + error.message);
      } else {
        setMessage('Account created! Please check your email.');
      }
    }
  };

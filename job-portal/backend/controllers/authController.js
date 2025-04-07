// @desc    Register user
exports.register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      // Create user
      const user = await User.create({ name, email, password });
  
      // Auto-login after registration
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profileCompletion: user.profileCompletion
          }
        });
      });
  
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      next(err);
    }
  };
  
  // @desc    Login user
  exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info.message });
  
      req.login(user, (err) => {
        if (err) return next(err);
        return res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profileCompletion: user.profileCompletion
          }
        });
      });
    })(req, res, next);
  };
  
  // @desc    Logout user
  exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ error: 'Logout failed' });
      res.json({ success: true });
    });
  };
  
  // @desc    Get current user
  exports.getMe = (req, res) => {
    res.json({ user: req.user || null });
  };
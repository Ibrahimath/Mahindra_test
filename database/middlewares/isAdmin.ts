const isAdmin = (req: any, res: any, next: any) => {
  try {
    const { email } = req.params.user;
    if (!email || email.indexOf("@mahindra.com") === -1) {
      res.json({
        status: false,
        message: "Sorry, you are not allowed here",
      });
      return;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = isAdmin;

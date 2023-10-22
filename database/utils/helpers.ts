const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password:string) => {
  return new Promise((resolve:any, reject:any) => {
    bcrypt.genSalt(saltRounds, (err:any, salt:any) => {
      bcrypt.hash(password, salt, (err:any, hash:any) => {
        resolve({ hash, salt });
      });
    });
  });
};

const comparePassword = async (password:string, hashPassword:string) => {
  return new Promise((resolve, reject) => {
    let result = bcrypt.compare(password, hashPassword);
    if (result) {
      resolve(result);
    } else {
      reject();
    }
  });
};

export {
  hashPassword,
  comparePassword,
};

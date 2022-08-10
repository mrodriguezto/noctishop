import JWT from 'jsonwebtoken';

const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('No secret key for jwt in the environment variables');
  }

  return JWT.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' },
  );
};

const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('No secret key for jwt in the environment variables');
  }

  return new Promise((resolve, reject) => {
    try {
      JWT.verify(token, process.env.JWT_SECRET_KEY || '', (err, payload) => {
        if (err) return reject('Invalid token');
        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject('Invalid token');
    }
  });
};

export const jwt = {
  signToken,
  isValidToken,
};

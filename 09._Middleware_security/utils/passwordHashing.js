import bcrypt from 'bcrypt';

const password = 'Hunter123';
const passwordComparison = 'Hunter123';
const saltRounds = 14;

// /auth/signup     /auth/regiser
const hasedPassword = await bcrypt.hash(password, saltRounds);


// /auth/login
const passwordIsSame = await bcrypt.compare(passwordComparison, hasedPassword);

console.log(passwordIsSame);

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const secret=process.env.JWT_SECRET;
export const hashPassword=p=>bcrypt.hashSync(p,12);
export const checkPassword=(p,h)=>bcrypt.compareSync(p,h);
export const signUser=u=>jwt.sign({id:u.id,email:u.email,role:u.role},secret,{expiresIn:'7d'});
export function auth(req,res,next){try{const h=req.headers.authorization||''; if(!h.startsWith('Bearer ')) return res.status(401).json({error:'Authentication required'}); req.user=jwt.verify(h.slice(7),secret); next();}catch(e){res.status(401).json({error:'Invalid or expired token'});}}
export function admin(req,res,next){if(req.user?.role!=='admin') return res.status(403).json({error:'Admin access required'}); next();}

import mysql from 'mysql2/promise';
export async function conectar(){
    try{
        const bdd=await mysql.createPool({
            host:"localhost",
            database:"pruebaback",
            user:"root",
            password:"contrasena"
        })
        console.log('conectado a pruebaback');
        return bdd;
    }
    catch(error){
        console.log(`error, base no conectada`);
    }
}

// import {conectar}from '../database/conexion.js';
// const bdd=await conectar();

// export const cNuevo=async(pet, resp)=>{
//     //1: tomar contenido de los name
//     //2: colocar esos name en el insert
//     //3: ejecutar ese insert
//     let nom, username, email, contra, desc, url, fecha;
//     nom=;
//     username=;
//     email=;
//     contra=;
//     desc=;
//     url=;
//     fecha=;

//     try {
//         let altasSQL= "INSERT INTO `usuarios`(`nombre_usuario`,`username`,`email`,`contrasena`,`descripcion`,`url_foto`,`fecha_registro`)VALUES('"+nom+"','"+username+"','"+email+"','"+contra+"','"+desc+"','"+url+"','"+fecha+"');";
//         const [registro]=await bdd.query(altasSQL);
//         console.log(registro);
//     } catch (error) {
//         console.log(`error al crear la sentencia insert ${error}`);
//     }
// }
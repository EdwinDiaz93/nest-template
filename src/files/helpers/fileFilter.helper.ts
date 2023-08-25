export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    // verificar si viene el archivo
    if (!file) return callback(new Error('File is empty'), false);

    // extraer la extension
    const fileExtension = file.mimetype.split('/').pop();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    // verificar si hay extensiones validas
    if (validExtensions.includes(fileExtension)) {
        return callback(null,true);
    }

    // recharzar el archivo    
    callback(null, false);

}
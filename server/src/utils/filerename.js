const FileRename = (file) => {
    const { originalname, filename } = file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = filename + '.' + ext
    return file.path;
}

export default FileRename;

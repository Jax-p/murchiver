# Murchiver
Zip all directories in current path with support for ignoring specific folders and files

## Ignore list
Murchiver uses `.murchiver_ignore` file for excluding directories and files. All patterns will not be zipped or will not be included in output archive. Murchiver uses _glob_ to specify path and ignored files and folders.

### Example:
_.murchiver_ignore_
```
node_modules
.*
**/*.scss
```
- will not create _node_modules.zip_
- will not create archive from any directory starting with `.` and also excludes files starting with `.` from archives 
- excludes all files ending with `.scss` from archives 

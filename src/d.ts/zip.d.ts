
// declare module "cli-components/zip"
// {
//     import when = require('when')
//     import lsArchive = require('ls-archive')

//     class Zip
//     {
//         archivePath :string;

//         new(_archivePath:string);
//         ls()                            :when.Promise<lsArchive.ArchiveEntry[]>;
//         cat(filePath:string)            :when.Promise<Buffer>;
//         catGzip(gzipArchivePath:string) :when.Promise<Buffer>;
//     }


//     export = Zip;
// }
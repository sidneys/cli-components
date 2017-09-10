/// <xreference path="../typings/tsd.d.ts" />

// import when = require('when')
// import whenNode = require('when/node')
// import lsArchive = require('ls-archive')

// class Zip
// {
//     archivePath :string;

//     constructor(_archivePath:string) {
//         this.archivePath = _archivePath
//     }

//     ls() :when.Promise<lsArchive.ArchiveEntry[]> {
//         var list = whenNode.lift(lsArchive.list)
//         return list(when.resolve(this.archivePath))
//     }

//     cat(filePath:string) :when.Promise<Buffer> {
//         var read = whenNode.lift(lsArchive.read)
//         return read(when.resolve(this.archivePath), when.resolve(filePath))
//     }

//     catGzip(gzipArchivePath:string) :when.Promise<Buffer> {
//         var readGzip = whenNode.lift(lsArchive.readGzip)
//         return readGzip(when.resolve(gzipArchivePath))
//     }
// }


// export = Zip;

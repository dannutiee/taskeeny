import { MutationResolvers } from "../../__generated__/typeDefs";
import { createWriteStream } from "fs";
import path from "path";
var Readable = require("stream").Readable;

type ResolveUploadFile = MutationResolvers["uploadFile"];

export const resolveUploadFile: ResolveUploadFile = async (
  _parent,
  { file },
  { user }
) => {
  const { encoding } = file;

  const base64result = encoding.split(",")[1];
  const imgBuffer = Buffer.from(base64result, "base64");
  const avatarName = `avatar_${user.id}.jpg`;

  var stream = new Readable();

  stream.push(imgBuffer);
  stream.push(null);

  await new Promise((res) =>
    stream
      .pipe(
        createWriteStream(
          path.join(
            __dirname,
            "../../../../../client/public/images",
            avatarName
          ),
          { encoding: "base64" }
        )
      )
      .on("close", res)
  );

  return {
    filename: avatarName,
  };
};

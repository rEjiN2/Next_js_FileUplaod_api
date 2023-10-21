import {writeFile,mkdir} from 'fs/promises'
import { NextResponse } from 'next/server'
import {join,dirname} from 'path'

export const POST = async (request) => { 
    try{
 const data = await request.formData()
 const file = data.get('file')
 console.log(file,"file");
 if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  console.log(buffer,"buff");
  const path = join( './' , 'tmp', file.name)
  console.log(path,"pa");

    const dir = dirname(path);
    await mkdir(dir, { recursive: true });
  try{
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)
  }catch(err){
          console.error(err);
  }
 return new NextResponse("Success", { status: 200 });
    }catch(err){
        return new NextResponse("Error", { status: 500 });
    }
}


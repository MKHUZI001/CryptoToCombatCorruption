import {useGlobal} from 'reactn';

function Photo()
{ 
  var imgsrc = "";
  const [source] = useGlobal('photo');
  
  try
    {
      imgsrc = require(`${source}`);
    }

  catch(e)
    {
      imgsrc = source;
    }

  return(
    <div>
      <img
       id="photo" src={imgsrc} alt="No image selected" width="200" height="280"
      />
    </div>
    )
}

export default Photo;
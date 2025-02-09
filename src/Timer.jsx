import {useState,useEffect} from 'react'
import './Timer.css'


function Timer(props){
    
    let resetTime;
    const [time,setTime] = useState(calculateTime(props.time.hours,props.time.minutes,props.time.seconds));
    
    const [isRunning,setisRunning] = useState(true);
    const [editState,seteditState] = useState({field:null,value:null});
    

    useEffect(()=>{
        resetTime = props.time;
        if(parseInt(formatTime(time).hours)==0 &&parseInt(formatTime(time).minutes)==0&&parseInt(formatTime(time).seconds)==0){
            setisRunning(false);
           
        }
    const intervalId = setInterval(()=>{
         if(isRunning){
            
            setTime(time-1);
         }
           
        },1000);    
    return ()=> clearInterval(intervalId);
}
,[isRunning,time]);

const handleInputChange = (e) => {
    
        if(e.target.value.length !=0){
            const time_temp = {...formatTime(time),[editState.field]:e.target.value};
            setTime(calculateTime(time_temp.hours,time_temp.minutes,time_temp.seconds));

        }else if(e.target.value.length == 0)    {
               const time_temp= {...formatTime(time),[editState.field]:0};
               setTime(calculateTime(time_temp.hours,time_temp.minutes,time_temp.seconds));

        }
};

function formatTime (time){
    const hours = Math.floor(time/3600);

    const minutes = Math.floor((time-3600*hours)/60);
    const seconds = time-hours*3600-minutes*60;
    
 return {hours:String(hours).padStart(2,0),minutes:String(minutes).padStart(2,0),seconds:String(seconds).padStart(2,0)};
 
}

function calculateTime(hours,minutes,seconds){
    return parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds);
}

function handleEditField(field){
        if(editState.field===field){
           
        setisRunning(true);
        editState.field=null;

    }else{
        
        setisRunning(false);
        seteditState({field,value:formatTime(time)[field]})
    }
}


    function Pause(){
        isRunning?setisRunning(false):setisRunning(true);
        editState.field=null;
    }

    function Reset(){
        setTime(calculateTime(props.time.hours,props.time.minutes,props.time.seconds));
        setisRunning(false);
    }
    function Time(props){
            let field = props.field;
           
            let formatted_time = formatTime(time);
            
       if(editState.field!=field) {return(
            
            <div className={field}  onClick={()=>{handleEditField(field)}}>
                
                {formatted_time[field]}
            </div>
        )
    }else if(editState.field==field){
        
        return(<span>
            <input type="number" className='input' onClick={()=>{handleEditField(field)}} defaultValue={formatted_time[field]} onChange={handleInputChange} maxLength="2" min="0" autoFocus/>
        </span>)
    }
    }

    
    return (
        
        <div className="timer">
          <div className="container">
        {["hours","minutes","seconds"].map((field,index)=>{
            
            return( 
                <>
            <Time field={field} key={index} />{index<2?":":null}
            </>
            )
        })}
          
          </div>
         <div className="buttons">
          <button  onClick={Pause}>{isRunning?'Pause':'Resume'}</button>
          <button  onClick={Reset}>Reset</button>
          </div>
        </div>
      
    )

}

export {Timer};
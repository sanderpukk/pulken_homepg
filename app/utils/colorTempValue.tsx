export const colorTempValue = (minTemp:number, maxTemp:number) => {


    return <>{minTemp < 10 ?
        <span style={{color:'#66b3ff'}}>{minTemp}</span>
        :
        <span style={{color:'#ff1a53'}}> {minTemp} </span>
    }
    <span>/</span>
    {maxTemp < 0 ?
        <span style={{color:'#66b3ff'}}>{maxTemp}</span>
        :
        <span style={{color:'#ff1a53'}}> {maxTemp} </span>
    }
    </>
    
}
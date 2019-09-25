export 	const getSheetValues = async (accessToken, sheet, range) =>{
    try {
      const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1d7Ml25tKLZZSs-zWaHO3QueNaJ4a9EHLzUu74S6E1H8/values/${sheet}!${range}`,
      {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      });
      const data = await request.json();

      if(!data) {
        return {status: false, msg: 'no data'}
      }

      return data.values
    } catch (error) {
    }
  }

  export const getLastRecords = async (accessToken, sheet, lastRecords) => {
    try {
      const data = await getSheetValues(accessToken, sheet, 'A:G?majorDimension=Columns').then(response => response)

      if(data && data.length) {

        const keysMap = data.map(element => element[0])

        const values = data[0].map((element, index) => {
          let Obj = {}

          for(let  i = 0; i < keysMap.length; i++ ) {
            Obj[keysMap[i]] = data[i][index]
            
          }

          return Obj

        })

        return values.slice(-Math.abs(lastRecords))

      }


    } catch (error) {
      
    }
  }
  
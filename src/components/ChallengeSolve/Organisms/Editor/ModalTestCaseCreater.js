/*
This is used for creating the test case result array for modal
*/

export default function createModalTestCaseResult(total,amount_solved,data,type){
    let solved_all =  total <=  amount_solved ? true : false;
    let temp = {
      didSolve:solved_all,
      tests : []
      };
    for(let i = 1;i<total+1;i++){
      temp.tests.push({
        id:i,
        name:`Test Case ${i}`,
        status: i <= amount_solved ? "pass" : "fail"
      })
    }

    console.log(`solved_all is ${solved_all}`)
    if (!solved_all){
      let is_invalidAnswer = data["detail"]["reason"] === "InvalidAnswer";
      temp["errorType"]  =  is_invalidAnswer ? "hasMismatch" : data["reason"]

      is_invalidAnswer  ? (
        type !== "submit" ? (
            temp["error"] = {
              yourAnswer:data["detail"].output,
              expectedOutput:data["detail"].expected_output,
            }
          ):(
              temp["error"] = {
              yourAnswer:"",
              expectedOutput:"",
            }
            )
        ) : (

        temp["error"] = data["detail"]["error"]
        )
    }else{
      temp["errorType"] = "allPassed"
    }

    return temp;
}
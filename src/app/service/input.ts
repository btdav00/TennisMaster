

export class MyInput{
  public static input: object

  public static addInput(input: object){
    MyInput.input=input
  }
  public static getInput(){
    return MyInput.input
  }
}

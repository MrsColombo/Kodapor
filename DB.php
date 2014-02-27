<?php
class DB{

  private $con;

  function __construct() {
    if(!$this->con = mysqli_connect("localhost", "root", "", "coderspool"))
      $this->ThrowMySqlException();
  }

  function __destruct() {
    mysqli_close($this->con);
  }

  private function ThrowMySqlException($sql = null){
    if($sql != null)
      throw new Exception("MySQL error: ".$this->con->error." <br/> Query was: ".$sql);
    else
      throw new Exception("MySQL error: ".$this->con->error);
  }

  private function RandomString($length = 10){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString; //cheat ftw
  }

  private function RandomNumber($length = 10){
    $characters = '0123456789';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString; //cheat ftw
  }

  private function AddAccount($username, $password){
    //Account stuff
      $AccountSql = "INSERT INTO accounts (username, password) VALUES ('".$username."', '".$password."' )"; 
      $AccountResult = mysqli_query($this->con, $AccountSql);
      if(!$AccountResult){
        //Something went wrong...
        $this->ThrowMySqlException($AccountSql);
      }
  }

  private function DoesUserNameExists($username){
    $sql = "SELECT username FROM accounts WHERE username = '".$username."' ";
    $res = mysqli_query($this->con, $sql);
    if(!$res){
      echo $this->con->error;
      echo "<br/>";
      $this->ThrowMySqlException($sql);
    }
    if($res->num_rows > 0)
      return true;
    else
      return false;

  }

  public function GenerateRandomData($Entries){
    $i = 0;
    while($i <= $Entries){
      $FirstNames = array("Peter", "Michael", "Linus", "Ulrik", "Hannah", "Anna", "Sture", "Åke", "Per", "Lena", "Oskar", "Filip", "Joel", "Daniel", "Hampus", "Ellenor", "Johannes", "Camilla", "Gustav", "Oskar", "Anders", "Victoria", "Frida", "Ellinor", "Jakob", "Andreas", "Eric", "Erik", "Johanna", "Simon", "Martin", "Sune", "Pierre", "Pär", "Linda", "Valeria", "Lisa", "Homer");
      $LastNames = array("Lundberg", "Gullander", "Svensson", "Larsson", "Grönlund", "Blomstrand", "Eriksson", "Fagerlin", "Fahlstedt", "Ferm", "Ahlström", "Almlöf", "Boström", "Fernholm", "Borelius", "Dahlgren", "Dahlbäck", "Dalén", "Dahlin", "Berggren", "Gullberg", "Danielsson", "Cederberg", "Cederborg", "Fredriksson", "Frid", "Frisk", "Aulin", "Ahlin", "Asplund", "Lund", "Centerwall", "Simpson");
      $Companies = array("Microsoft", "Dell", "HP", "Apple", "Telia", "Sony", "Ikea", "Yellowfish", "Softlayer", "Sydsvenskan", "Aftonbladet", "Metro", "Dynamicdog", "SVT", "Nintendo", "Ica", "Statoil", "Portendo", "Altran", "Samport", "Sandå", "Sunannå Productions", "Babybjörn", "Addici", "Irisgruppen", "Exova", "Finansportalen", "Metria", "Mediatec", "Medison", "Transcom", "Dragon Gate", "Activia", "Cint", "CDON", "Swedpower", "Millhouse");
      $RandFirst = $FirstNames[array_rand($FirstNames, 1)];
      $RandLast = $LastNames[array_rand($LastNames, 1)];
      //This is our username
      $Username = $RandFirst.$RandLast;
      $Password = $this->RandomString(10);
      $Email = $Username."@gmail.com";
      $Phone = "070".$this->RandomNumber(6);
      $Company = array_rand($Companies, 1);
      $Contact = $RandFirst." ".$RandLast; //What is this?

      //Do some actual DB stuff here

      

      //Appliers stuff
      while($this->DoesUserNameExists($Username)){
        $RandFirst = $FirstNames[array_rand($FirstNames, 1)];
        $RandLast = $LastNames[array_rand($LastNames, 1)];
        $Username = $RandFirst.$RandLast;
        $Password = $this->RandomString(10);
        $Email = $Username."@gmail.com";
        $Phone = "070".$this->RandomNumber(6);
        $Company = array_rand($Companies, 1);
      }
      $this->AddAccount($Username, $Password);
      $AppliersSql = "INSERT INTO appliers (username, firstname, lastname, email, phone) 
      VALUES ('".$Username."', '".$RandFirst."', '".$RandLast."', '".$Email."', '".$Phone."' ) ";
      
      $ApplierResult = mysqli_query($this->con, $AppliersSql);
      if(!$ApplierResult){
        //Something went wrong...
        $this->ThrowMySqlException($ApplersSql);
      }


      while($this->DoesUserNameExists($Username)){
        $RandFirst = $FirstNames[array_rand($FirstNames, 1)];
        $RandLast = $LastNames[array_rand($LastNames, 1)];
        $Password = $this->RandomString(10);
        $Username = $RandFirst.$RandLast;
        $Email = $Username."@gmail.com";
        $Phone = "070".$this->RandomNumber(6);
        $Company = array_rand($Companies, 1);
        $Contact = $RandFirst." ".$RandLast;
      }
      $this->AddAccount($Username, $Password);
      //Employee stuff
      $EmployeeSql = "INSERT INTO employers (username, company, contact, email, phone) 
      VALUES ('".$Username."', '".$Company."', '".$Contact."', '".$Email."', '".$Phone."' ) ";
      $EmployeeResult = mysqli_query($this->con, $EmployeeSql);
      if(!$EmployeeResult){
        //Something went wrong...
        $this->ThrowMySqlException($EmployeeSql);
      }

      $i++;
    }
  }
}

     
?>
<?php 
ini_set('display_errors',1);
error_reporting(E_ALL);

header("Content-Type: text/html;charset=utf-8");


  $response = array();
  
$dbc = mysqli_connect($servername, $username, $pass, $db)or die("Bad Connect".mysqli_connect_error());

mysqli_query($dbc,"SET CHARACTER SET 'utf8'");
mysqli_query($dbc,"SET SESSION collation_connection ='utf8_unicode_ci'");

$result = $dbc->query("SELECT * FROM projectsdataset WHERE (DateStart IS NOT NULL) OR (DateFinish IS NOT NULL)");


 if(mysqli_num_rows($result)>0)
  {
    
      $response["projects"] = array();

      while( $row = @mysqli_fetch_array($result) ) 
      {
            
            $projects = array();
            
           
            //$projects[] = $row['id'];
            $projects["id"] = $row["id"];
            $projects["Accurate"] = $row["Accurate"];
            $projects["TypeOfProject"] = $row["TypeOfProject"];
            $projects["DateStart"] = $row["DateStart"];
          //$projects["DateStart"] = date('Y', strtotime($row["DateStart"]));
            $projects["DateFinish"] = $row["DateFinish"];
          //$projects["DateFinish"] = date('Y', strtotime($row["DateFinish"]));
          $projects["SpecColl"] = $row["SpecColl"];
          $projects["Published"] = $row["Published"];
            $projects["TitleOfProject"] = $row["TitleOfProject"];
            $projects["DescriptionOfProject"] = $row["DescriptionOfProject"];
            $projects["Source1"] = $row["Source1"];
            $projects["Source2"] = $row["Source2"];
            $projects["Source3"] = $row["Source3"];
            $projects["ExtraRole"] = $row["ExtraRole"];
            //$projects["<pre></pre>"];
            //$projects["<p></p>"];
          
          if(empty($projects["DateStart"])){
              $date = $projects["DateFinish"];
              $date1 = str_replace('-', '/', $date);
              $newstart = date('Y-m-d',strtotime($date1 . "-30 days"));


              
              $projects["DateStart"]=$newstart;
          }

            array_push($response["projects"], $projects);
      }
      $response["success"] = 1;
       
   
       //var_dump($response);
       //$response = array_map("utf8_encode", $response );
       
echo json_encode($response);

  }else {

      $response["success"] = 0;
      $response["message"] = "No Events Found";

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    
    
?>

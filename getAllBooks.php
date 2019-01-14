<?php

  require_once '../ConnectionManager.php';

  $response = array();

  $db = ConnectionManager::getInstance();

  $result = mysql_query("SELECT * FROM booklibrary") or die (mysql_error());

  if(mysql_num_rows($result)>0)
  {
      $response["books"] = array();

      while($row = mysql_fetch_array($result))
      {
            $books = array();
            $books["id"] = $row["id"];
            $books["BookTitle"] = $row["BookTitle"];
            $books["Author"] = $row["Author"];
            $books["YearPublished"] = $row["YearPublished"];
            $books["Notes"] = $row["Notes"];
            $books["<pre></pre>"];
            $score["<p></p>"];

            array_push($response["books"], $books);
      }
      $response["success"] = 1;

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
  }else {

      $response["success"] = 0;
      $response["message"] = "No Books Found";

      echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    ?>

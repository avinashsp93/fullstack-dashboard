<?php
//database settings
$connect = mysqli_connect("localhost", "root", "", "mswatervalley");

switch($_SERVER['REQUEST_METHOD'])
{
case 'GET': $flag = $_GET["flag"]; break;
case 'POST': $flag = $_POST["flag"]; break;
}

if($flag == 'populateStudentDetails') {
  $result = mysqli_query($connect, "SELECT s.student_id, s.student_first_name, s.student_last_name, COUNT( o.id ) AS infractions_count
FROM students s
JOIN odrs o
WHERE s.student_id = o.student_id and s.academic_year = o.academic_year
GROUP BY s.student_id
LIMIT 20");
  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = $row;
  }
  print json_encode($data);
}

elseif($flag == 'loadInfractions') {
  $student_id = $_POST["student_id"];
  $result = mysqli_query($connect, "SELECT i.infraction_description AS  'Infraction_Description', a.action_on_infraction_description AS  'Action_Taken', d.date_field AS  'Date', CONCAT( t.hour_range, ' ', t.hour_type ) AS  'Time'
FROM odrs o
JOIN infraction i ON i.id = o.infraction_id
JOIN dim_date d ON d.date_id = o.incident_date_id
JOIN dim_time t ON o.incident_time_id = t.time_id
JOIN action_on_infraction a ON o.action_on_infraction_id = a.id
WHERE student_id=$student_id");
  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = $row;
  }
  print json_encode($data);
}
?>

<?php
	namespace Users\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;

class GoGrid
{
    protected $tableGateway;

    public function __construct(TableGateway $tableGateway)
    {
        $this ->tableGateway = $tableGateway;
        $this ->adapter = new \Zend\Db\Adapter\Adapter(array(
            'driver' => 'Pdo_Mysql',
            'database' => 'zf',
            'username' => 'root',
            'password' => '',
            'driver_options' => array(
                1002 => 'SET NAMES \'utf8\''
            )
        )); 
       
    }


    
    public function fetchAll()
    {
    	$resultSet = $this->tableGateway->select();
    	return $resultSet;
    }
    
    public function checkAll($user,$educ,$city)
    {    
              
    	 $sql="SELECT u.id ,u.name, c.city, e.education FROM user u JOIN city c ON u.id=c.id_user JOIN education e ON u.id=e.id_user";
                if (!empty($user)){ foreach ($user as $key1 => $val1 ){
                                        $st_user=$st_user.$val1.",";
                                    }
                                     $st_user= substr($st_user, 0, -1);
                                     $sql = $sql." WHERE u.id IN ($st_user)";
                      } 
                       
                if (!empty($educ)){foreach ($educ as $key1 => $val1 ){
                                        $st_educ=$st_educ.$val1.",";
                                    }
                                    $st_educ= substr($st_educ, 0, -1);
                                    if (!empty($user)){  $sql = $sql." AND e.id_user IN ($st_educ)";  } 
                                    else { $sql = $sql." WHERE e.id_user IN ($st_educ)"; }
                       } 
                if (!empty($city)){ foreach ($city as $key1 => $val1 ){
                                        $st_city=$st_city.$val1.",";
                                    }
                                    $st_city=substr($st_city, 0, -1);
                                    if (empty($user) and empty($educ)){ $sql = $sql." WHERE c.id_user IN ($st_city)"; } 
                                    else { $sql = $sql." AND c.id_user IN ($st_city)"; }
                   }  
        
                               $statement = $this -> adapter -> createStatement($sql);
                               $statement->prepare();
                               $data = $statement->execute();
    	return $data;
    }
    
     
   
}

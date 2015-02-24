<?php
namespace Users\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;

class UserManagerController extends AbstractActionController
{
   
   public function indexAction()
    {    
           $viewModel  = new ViewModel(); 
	       return $viewModel; 
        
    }
   
    public function menuAction()
    {    
         $par = $this->request->getPost();
         if($par){
    	   $userTable = $this->getServiceLocator()->get($par['par']);
            $viewModel  = new JsonModel( $userTable->fetchAll()->toArray()); 
	        
            return $viewModel; }
        
    }
         
    public function editAction()
    {
        $id = $this->request->getPost();
                
        if($id){
            $gridTable = $this->getServiceLocator()->get('EducTable');
            $gridTable -> editEduc($id);
        }
       
    }

    public function gridAction()
    {   
        
        $user = array();
        $educ = array();
        $city = array();
        $stack = array();
        $ss = array();
        $gridTable = $this->getServiceLocator()->get('Grid');
    	$id = $this->request->getPost();		
		if($id){
	       foreach ($id as $key => $val) {
			
                    if(strpos($key,"user")!==FALSE){ array_push($user,$val);} else {}
                    if(strpos($key,"educ")!==FALSE){ array_push($educ,$val);} else {}
                    if(strpos($key,"city")!==FALSE){ array_push($city,$val);} else {}
          		    }
         
           $data= $gridTable -> checkAll($user,$educ,$city);  
           foreach($data as $item){   array_push($stack,$item['id'],$item['name'],$item['education'],$item['city'] );
                                      array_push($ss, $stack);
                                      $stack = array();  
                                  }          
          $viewModel  = new JsonModel( array("success" => true, "users"  => $ss) ); 
	      return $viewModel;                     
                
     }              	 
    }
  
}

<?php
namespace Users\Model;

class User
{
    public $id;
    public $id_user;
    public $name;
    public $education;
    public $city;
    
  
	function exchangeArray($data)
	{
		$this->id		= (isset($data['id'])) ? $data['id'] : null;
        $this->id_user		= (isset($data['id_user'])) ? $data['id_user'] : null;
		$this->name		= (isset($data['name'])) ? $data['name'] : null;
	    $this->education	= (isset($data['education'])) ? $data['education'] : null;	
        $this->city	= (isset($data['city'])) ? $data['city'] : null;	
	}
	
	public function getArrayCopy()
	{
		return get_object_vars($this);
	}	
}

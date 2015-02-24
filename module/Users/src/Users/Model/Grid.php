<?php
namespace Users\Model;

class Grid
{
    public $user;
    public $educ;
    public $city;
 

	function exchangeArray($data)
	{
		$this->id		= (isset($data['user'])) ? $data['user'] : null;
        $this->id_user		= (isset($data['educ'])) ? $data['educ'] : null;
		$this->name		= (isset($data['city'])) ? $data['city'] : null;
		
	}
			
}
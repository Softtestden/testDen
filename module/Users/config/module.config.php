<?php

return array(
    'controllers' => array(
    'invokables' => array(
            'Users\Controller\UserManager' => 'Users\Controller\UserManagerController',
        
      ),
    ),
    'router' => array(
        'routes' => array(
            'users' => array(
                'type' => 'Literal',
                'options' => array(
                      'route' => '/users',
                      'defaults' => array(
                            '__NAMESPACE__' => 'Users\Controller',
                            'controller' => 'Users\Controller\UserManager',
                            'action' => 'menu',
                       ),
                  ),
                'may_terminate' => true,
                'child_routes' => array(
                   
                	'user-manager' => array(
                		'type'    => 'Segment',
                		'options' => array(
                			'route'    => '/user-manager[/:action[/:id]]',
                			'constraints' => array(
                				'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                				'id'     => '[a-zA-Z0-9_-]*',
                			),
                			'defaults' => array(
                				'controller' => 'Users\Controller\UserManager',
                				'action'     => 'index',
                			),
                		),
                	),
                    
                    
                  ),
                ),
              ),
            ),
         //),
     'view_manager' => array(
        'template_path_stack' => array(
            'users' => __DIR__ . '/../view',
         ),
         'strategies' => array(
            'ViewJsonStrategy',
        ),
      ),
);

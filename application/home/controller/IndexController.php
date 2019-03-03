<?php

namespace app\home\controller;


class IndexController extends PublicController
{
    public function index()
    {
        return $this->show();
    }
}

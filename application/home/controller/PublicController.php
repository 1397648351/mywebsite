<?php
/**
 * PublicController.php
 * Time   : 2019/3/2 17:00
 * Author : WuZe
 * Desc   :
 */

namespace app\home\controller;

use app\common\controller\BaseController;


class PublicController extends BaseController
{
    public function isLogin()
    {
        return session('?user');
    }
}


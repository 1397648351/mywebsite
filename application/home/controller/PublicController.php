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

    public function show($uselayout = false, $template = '')
    {
        if ($this->request->isPjax()) {
            // 临时关闭当前模板的布局功能
            $this->view->config('tpl_cache', false);
            $this->view->engine->layout(false);
        }
        exit($this->fetch($template));
    }
}


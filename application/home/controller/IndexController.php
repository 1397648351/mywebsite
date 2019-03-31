<?php

namespace app\home\controller;

use think\exception\HttpException;
use  think\facade\Env;


class IndexController extends PublicController
{
    public function index()
    {
        $sort = $this->request->param('sort');
        $author = $this->request->param('author');
        $keyword = $this->request->param('keyword');
        $list = null;
        if (!empty($sort)) {
            $list = $this->sort($sort);
        } elseif (!empty($author)) {
            $list = $this->author($author);
        } elseif (!empty($keyword)) {
            $list = $this->search($keyword);
        } else {
            $list = $this->all();
        }
        if (empty($list)) {
            $list = $this->emptyData();
        }
        $this->assign('list', $list);
        return $this->show(true);
    }

    private function all()
    {
        $list = array();
        $item = [
            'title' => '背景图片',
            'href' => 'javascript:;',
            'type' => 0,
            'date' => date("Y-m-d"),
            'author' => '星星',
            'content' => '<p><img width="480" height="300" src="/static/dist/images/bg.png" alt="图片"/></p>背景图片'
        ];
        array_push($list, $item);
        return $list;
    }

    private function sort($id)
    {
        $list = array();
        $item = [
            'title' => '背景图片' . $id,
            'href' => 'javascript:;',
            'type' => 0,
            'date' => date("Y-m-d"),
            'author' => '星星',
            'content' => '<p><img width="480" height="300" src="/static/dist/images/bg.png" alt="图片"/></p>背景图片'
        ];
        array_push($list, $item);
        return $list;
    }

    private function author($name)
    {
        $list = array();
        $item = [
            'title' => '未找到',
            'href' => null,
            'type' => 1,
            'date' => null,
            'author' => null,
            'content' => '抱歉，没有符合您查询条件的结果。'
        ];
        array_push($list, $item);
        return $list;
    }

    private function search($keyword)
    {
        $list = array();
        $item = [
            'title' => '未找到',
            'href' => null,
            'type' => 1,
            'date' => null,
            'author' => null,
            'content' => '抱歉，没有符合您查询条件的结果。'
        ];
        array_push($list, $item);
        return $list;
    }

    private function emptyData()
    {
        $list = array();
        $item = [
            'title' => '未找到',
            'href' => null,
            'type' => 1,
            'date' => null,
            'author' => null,
            'content' => '抱歉，没有符合您查询条件的结果。'
        ];
        array_push($list, $item);
        return $list;
    }

    public function file()
    {
        $filename = $this->request->param('filename');
        if (empty($filename)) exit(1);
        $filepath = Env::get('root_path') . 'public/static/dist/images/' . $filename;
        header("Content-type: " . $this->getImgData($filepath));
        $file = fopen($filepath, 'r') or die("Unable to open file!");
        echo fread($file, filesize($filepath));
        fclose($file);
    }

    private function getImgData($filepath)
    {
        $img_data = getimagesize($filepath);
        return $img_data['mime'];
    }
}

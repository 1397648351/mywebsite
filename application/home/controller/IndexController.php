<?php

namespace app\home\controller;

use think\exception\HttpException;
use  think\facade\Env;


class IndexController extends PublicController
{
    public function index()
    {
        return $this->show(true);
    }

    public function index2()
    {
        return $this->show(true);
    }

    public function index3()
    {
        if (isset($_SERVER['HTTP_USER_AGENT'])) {
            echo "isset";
        }
    }

    public function imgprotect(){
        return $this->show(true);
    }

    public function file()
    {
        $filename = $this->request->param('filename');
        if (empty($filename)) exit(1);
        $filepath = Env::get('root_path') . 'public/static/dist/images/' . $filename;
        //header("Accept-Ranges: bytes");
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

    public function video()
    {
        if ($this->request->isPost()) {
            $filepath = Env::get('root_path') . 'public/static/dist/video/1.mp4';
            header("Content-type: video/mp4");
            header("Accept-Ranges: bytes");
            $size = filesize($filepath);
            header("Content-Length: " . $size);
            if (isset($_SERVER['HTTP_USER_AGENT'])) {
                if (stristr($_SERVER['HTTP_USER_AGENT'], 'FIREFOX')) {
                    header("Content-Disposition: attachment;filename*=UTF-8''" . urldecode(basename($filepath)));
                } else {
                    header("Content-Disposition: attachment;filename=" . urldecode(basename($filepath)));
                }
            }
            header("Content-Range: bytes " . 0 . "-" . ($size - 1) . "/" . $size);
            $file = fopen($filepath, 'r') or die("Unable to open file!");
            while (!feof($file)) {
                echo fgets($file, 1024);
            }
            fclose($file);
            // echo fread($file, $size);
        } else {
            throw new HttpException(404, '错误的请求！');
        }
    }

}

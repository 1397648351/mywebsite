<?php
/**
 * BaseController.php
 * Time   : 2019/3/2 16:54
 * Author : WuZe
 * Desc   :
 */

namespace app\common\controller;

use page\Page;
use think\Controller;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class BaseController extends Controller
{
    function isMobile()
    {
        // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
        if (isset ($_SERVER['HTTP_X_WAP_PROFILE']))
            return true;

        //此条摘自TPM智能切换模板引擎，适合TPM开发
        if (isset ($_SERVER['HTTP_CLIENT']) && 'PhoneClient' == $_SERVER['HTTP_CLIENT'])
            return true;
        //如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
        if (isset ($_SERVER['HTTP_VIA']))
            //找不到为flase,否则为true
            return stristr($_SERVER['HTTP_VIA'], 'wap') ? true : false;
        //判断手机发送的客户端标志,兼容性有待提高
        if (isset ($_SERVER['HTTP_USER_AGENT'])) {
            $clientkeywords = array(
                'nokia', 'sony', 'ericsson', 'mot', 'samsung', 'htc', 'sgh', 'lg', 'sharp', 'sie-', 'philips', 'panasonic', 'alcatel', 'lenovo', 'iphone', 'ipod', 'blackberry', 'meizu', 'android', 'netfront', 'symbian', 'ucweb', 'windowsce', 'palm', 'operamini', 'operamobi', 'openwave', 'nexusone', 'cldc', 'midp', 'wap', 'mobile'
            );
            //从HTTP_USER_AGENT中查找手机浏览器的关键字
            if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
                return true;
            }
        }
        //协议法，因为有可能不准确，放到最后判断
        if (isset ($_SERVER['HTTP_ACCEPT'])) {
            // 如果只支持wml并且不支持html那一定是移动设备
            // 如果支持wml和html但是wml在html之前则是移动设备
            if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
                return true;
            }
        }
        return false;
    }

    function gotoView()
    {
        $controller = $this->request->controller();
        $action = $this->request->action();
        $dir = 'pc';
        if ($this->isMobile()) {
            $dir = 'mobile';
        }
        $template = $controller . '/' . $dir . '/' . $action;
        return $this->fetch($template);
    }

    function get_page($data, $listRows)
    {
        // 获取分页显示
        $curpage = input('page') ? input('page') : 1;//当前第x页，有效值为：1,2,3,4,5...
        $offset = ($curpage - 1) * $listRows;
        $showdata = array_slice($data, $offset, $listRows, false);
        $list = Page::make($showdata, $listRows, $curpage, count($data));
        return $list;
    }

    /**
     * json返回
     * @param array $data 数据
     * @param int $status_code 状态码
     * @param int $msg 描述
     * @author LiuTao liut1@kexinbao100.com
     */
    public function resJson($data = array(), $status_code = 1001, $msg = 0)
    {
        header('Content-Type:application/json; charset=utf-8');
        $res['data'] = $data;
        $res['status_code'] = $status_code;
        $res['msg'] = $msg;
        $str = json_encode($res, JSON_UNESCAPED_UNICODE);
        exit($str);
    }

    /**
     * 生成GUID
     */
    public function guid()
    {
        if (function_exists('com_create_guid')) {
            return com_create_guid();
        } else {
            mt_srand((double)microtime() * 10000);
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);
            $uuid = ''
                //. chr(123)
                . substr($charid, 0, 8) . $hyphen
                . substr($charid, 8, 4) . $hyphen
                . substr($charid, 12, 4) . $hyphen
                . substr($charid, 16, 4) . $hyphen
                . substr($charid, 20, 12);
            //. chr(125);
            return $uuid;
        }
    }

    /**
     * 下载文件时设置headers
     * @param string $contentType 文件类型
     * @param string $filename 文件名称
     * @author WUZE
     */
    public function downloadHeaders($contentType, $filename)
    {
        header('Content-Type: ' . $contentType);
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        // If you're serving to IE 9, then the following may be needed
        header('Cache-Control: max-age=1');
        // If you're serving to IE over SSL, then the following may be needed
        header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
        header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
        header('Pragma: public'); // HTTP/1.0
    }

    /**
     * 生成Excel表格
     * @param array $filed 键值对
     * @param string $fileName 文件名称
     * @param string $sheetName sheet名称
     * @param array $data
     * @return Xlsx
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     */
    public function downloadExcel($filed, $fileName = 'newExcel', $sheetName = 'sheet1', $data = array())
    {
        // 输出Excel表格到浏览器下载
        $this->downloadHeaders('application/vnd.ms-excel', $fileName);
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle($sheetName);
        $keys = array_keys($filed);
        for ($i = 0; $i < sizeof($keys); $i++) {
            if (!is_array($filed[$keys[$i]]))
                $sheet->setCellValueByColumnAndRow($i + 1, 1, $filed[$keys[$i]]);
            else {
                $sheet->setCellValueByColumnAndRow($i + 1, 1, $filed[$keys[$i]]['title']);
                $sheet->getColumnDimensionByColumn($i + 1)->setWidth($filed[$keys[$i]]['width']);
            }
        }
        for ($i = 0; $i < sizeof($data); $i++) {
            for ($j = 0; $j < sizeof($keys); $j++) {
                $sheet->setCellValueByColumnAndRow($j + 1, $i + 2, $data[$i][$keys[$j]]);
            }
        }
        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        //return $writer;
    }
}
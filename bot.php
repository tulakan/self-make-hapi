<?php
$access_token = 'tr8HLJ2dhtefwQfJmfwNRaDmby+sPq+Hig5ut3kN/fehhXey8kttyk/aZCzi1/Xt+9CIYLHaLMUr0ZP58JvdTGHW0Xxqop3vA0CtHJsxkrcvNU20TtFntWrDlo30+QJFGXLW1of5cAfw1IDl0M5UqgdB04t89/1O/w1cDnyilFU=';

// Get POST body content
$content = file_get_contents('php://input');
// Parse JSON
$events = json_decode($content, true);
// Validate parsed JSON data
if (!is_null($events['events'])) {
    // Loop through each event
    foreach ($events['events'] as $event) {
        // Reply only when message sent is in 'text' format
        if ($event['type'] == 'message' && $event['message']['type'] == 'text') {
            // Get text sent
            $text = $event['message']['text'];
            // Get replyToken
            $replyToken = $event['replyToken'];

            $bufferMessage = [];
           
            //text message
//            $message1 = [
//                'type' => 'text',
//                'text' => "ความชื้นในดิน : 40%"
//            ];
            $text1 = 'บรรทัดที่ 1';
            $text2 = 'บรรทัดที่ 2';
            $text3 = 'บรรทัดที่ 3';
            $text4 = 'บรรทัดที่ 4';
            $message1 = [
                'type' => 'text',
                'text' => $text1 . "\r\n" . $text2 . "\r\n" . $text3 . "\r\n" . $text4
            ];
            //text message
            $message2 = [
                'type' => 'text',
                'text' => 'สภาพอากาศดีมากกกก'
            ];
            //image message
            $message3 = [
                'type' => 'image',
                'originalContentUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/220px-Ash_Tree_-_geograph.org.uk_-_590710.jpg',
                'previewImageUrl' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/220px-Ash_Tree_-_geograph.org.uk_-_590710.jpg'
            ];


            if($event['message']['text'] == "อุณหภูมิเท่าไหร่"){
                $bufferMessage[0] = $message1;
            }

            if($event['message']['text'] == "ความชื้นในดินมีค่าเท่าไหร่"){
                $bufferMessage[0] = $message1;
            }
            if($event['message']['text'] == "สภาพอากาศเป็นไง"){
                $bufferMessage[0] = $message2;
            }
            if($event['message']['text'] == "ถ่ายรูปให้ดูหน่อย"){
                $bufferMessage[0] = $message3;
            }
            if($event['message']['text'] == "ขอข้อมูลทั้งหมด"){
                $bufferMessage[0] = $message3;
            }



            // Make a POST Request to Messaging API to reply to sender
            $url = 'https://api.line.me/v2/bot/message/reply';
            $data = [
                'replyToken' => $replyToken,
                //'messages' => [$message1,$message2],
                'messages' => $bufferMessage,
            ];
            $post = json_encode($data);
            $headers = array('Content-Type: application/json', 'Authorization: Bearer ' . $access_token);

            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            $result = curl_exec($ch);
            curl_close($ch);

            echo $result . "\r\n";
        }
    }
}

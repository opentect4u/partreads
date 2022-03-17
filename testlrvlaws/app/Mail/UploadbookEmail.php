<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use DB;

class UploadbookEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $publisher_name;
    public $book_name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name,$publisher_name,$book_name)
    {
        $this->name=$name;
        $this->publisher_name=$publisher_name;
        $this->book_name=$book_name;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from_email=DB::table('md_param')->where('_id','=','61cabfcb33347840880f3ce2')->value('param_value');
        return $this->from($from_email)
                    ->subject('PartReads - Share Pages')
                    ->view('emails.upload_book');
    }
}

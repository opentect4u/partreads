<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use DB;

class ApproveRejectbookEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user_name;
    public $book_name;
    public $app_rej;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_name,$book_name,$app_rej)
    {
        $this->user_name=$user_name;
        $this->book_name=$book_name;
        $this->app_rej=$app_rej;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from_email=DB::table('md_param')->where('_id','=','61cabfcb33347840880f3ce2')->value('param_value');
        $subject = $this->app_rej;
        $tot_subject="PartReads - ".$subject." Book";
        return $this->from($from_email)
                    ->subject($tot_subject)
                    ->view('emails.approve_reject_book');
    }
}

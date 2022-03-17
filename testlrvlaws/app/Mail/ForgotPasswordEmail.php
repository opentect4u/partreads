<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use DB;

class ForgotPasswordEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user_name;
    public $url;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_name,$url)
    {
        $this->user_name=$user_name;
        $this->url=$url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from_email=DB::table('md_param')->where('_id','=','61cabfcb33347840880f3ce2')->value('param_value');
        
        // $from_email=DB::table('md_params')->where('_id','61cabfcb33347840880f3ce2')->value('param_value');
         return $this->from($from_email)
                    ->subject('PartReads - Forgot Password')
                    ->view('emails.forgot-password');
    }
}

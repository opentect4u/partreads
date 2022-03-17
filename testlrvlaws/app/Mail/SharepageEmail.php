<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
Use DB;

class SharepageEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user_name;
    public $remarks;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_name,$remarks)
    {
        $this->user_name=$user_name;
        $this->remarks=$remarks;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from_email=DB::table('md_param')->where('_id','=','61cabfcb33347840880f3ce2')->value('param_value');
        
        // $from_email=DB::table('md_params')->where('_id','6')->value('param_value');
         return $this->from("testing@ec2-65-1-39-181.ap-south-1.compute.amazonaws.com")
                    ->subject('Part Read - Share Pages')
                    ->view('emails.share-pages');
    }
}

<?php

namespace App\Http\Controllers;

use App\Mail\VerifyMail;
use App\Mail\ResetPassword;
use App\Models\Map\Customer;
use App\Models\Map\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function resetPassword(Request $request) {
        $validatedData = $request->validate([
            'email' => 'email'
        ]);
        if (!array_key_exists('email', $validatedData)) {
            return response()->json(["msg" => "Aucun utilisateur avec cette adresse mail"], 401);
        }

        $user = User::where('email', $validatedData['email'])->first();
        if (!$user) $user = Customer::where('email', $validatedData['email'])->first();

        if (!$user) {
            return response()->json(["msg" => "Aucun utilisateur avec cette adresse mail"], 401);
        } else {
            $url =  URL::temporarySignedRoute('password.redirect', now()->addHour(), [
                'id' => $user->id,
                'userType' => is_a($user, User::class) ? 'user' : 'customer',
                'hash' => sha1($user->email)
            ]);
            Mail::to($user)->send(new ResetPassword($user, $url));
            return response()->json(["msg" => "Mail envoyé"], 200);
        }
    }

    public function redirectResetPassword($userId, $userType, Request $request) {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "URL invalide"], 401);
        } else {
            if ($userType === 'user') $user = User::find($userId);
            else $user = Customer::find($userId);

            $hash = sha1($user->email);
            $urlParams =  URL::temporarySignedRoute('password.confirmReset', now()->addMinutes(10), [
                'id' => $userId,
                'userType' => $userType,
                'hash' => $hash
            ]);

            $urlParams = explode('/' . $userId . '/'. $userType . '/', $urlParams)[1];
            $urlParams = explode('?', $urlParams)[1];
            return redirect(env('APP_PREFIX') . '?action=resetPassword&user=' . $userId . '&userType=' . $userType . '&hash=' . $hash . '&' . $urlParams);
        }
    }

    public function confirmResetPassword($userId, $userType, Request $request) {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "URL invalide"], 401);
        } else {
            $validatedData = $request->validate([
                'password' => 'string'
            ]);
            if (array_key_exists('password', $validatedData)) {
                if ($userType === 'user') $user = User::find($userId);
                else $user = Customer::find($userId);

                $user->update([
                    'password' => Hash::make($validatedData['password'])
                ]);
                return response()->json(["msg" => "Mot de passe modifié"], 200);
            } else {
                return response()->json(["msg" => "Mot de passe invalide"], 401);
            }
        }
    }

    public function verify($userId, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "URL invalide"], 401);
        }

        $user = User::findOrFail($userId);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return redirect(env('APP_PREFIX') . '?user=' . $userId . '&mail=verified');
    }

    public function resend(Request $request)
    {
        $userId = $request->input('user_id');
        if ($userId) {
            $user = User::find($userId);
            if ($user && !$user->hasVerifiedEmail()) {
                $user->sendEmailVerificationNotification();
                return response()->json(['msg' => "E-mail de confirmation envoyé"]);
            } else {
                return response()->json(["msg" => "Email déjà vérifié ou utilisateur inconnu"], 401);
            }
        } else {
            return response()->json(["msg" => "Email déjà vérifié ou utilisateur inconnu"], 401);
        }
    }
}

<div class="w-full max-w-[400px] px-10 flex flex-col justify-start md:justify-center pt-32 m-auto">
                <header class="mb-10 md:mb-12 text-center md:text-left">
                    <h1 class="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.15em] mb-4">Sign In
                    </h1>
                    <p
                        class="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 leading-relaxed mx-auto md:mx-0 max-w-[240px] md:max-w-none">
                        Access the exclusive <br class="hidden md:block">architectural catalogue</p>
                </header>

                <form id="loginForm" class="space-y-8 md:space-y-10">
                    

                    <div class="group/input relative">
                        <div class="group/input relative flex items-end">
                            <div class="pb-4 border-b border-white/10 text-white/40 text-sm pr-4">
                                +91
                            </div>

                            <div class="flex-grow relative">
                                <label
                                    class="absolute -top-6 left-0 text-[9px] uppercase tracking-[0.4em] text-white/20">
                                    Mobile Number
                                </label>

                                <input type="tel" id="mobile" maxlength="10"
                                    class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-light tracking-[0.2em] outline-none transition-all gold-glow focus:border-white/40" placeholder="000 000 0000" maxlength="10">
                            </div>
                        </div>

                        <button type="button" id="sendOtp" class="w-full py-4 bg-white text-black uppercase">
                            Send OTP
                        </button>

                        <div id="otpSection" style="display:none;">
                            <input type="text" id="otp" maxlength="6" placeholder="Enter OTP"
                                class="w-full bg-transparent border-b border-white/10 py-4">

                            <button type="button" id="verifyOtp" class="w-full py-4 bg-[#c5a059] text-white mt-4">
                                Verify OTP
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-2">
                        <label class="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox"
                                class="w-3.5 h-3.5 rounded-none border border-white/20 bg-transparent checked:bg-[#c5a059] transition-all appearance-none cursor-pointer">
                            <span
                                class="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">Remember</span>
                        </label>
                        <a href="#"
                            class="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-[#c5a059] transition-colors">Recovery</a>
                    </div>

                    <div class="pt-6">
                        <button type="submit"
                            class="w-full py-5 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[#c5a059] hover:text-white transition-all duration-700 relative overflow-hidden group/btn shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)]">
                            <span class="relative z-10">Login</span>
                        </button>
                    </div>
                </form>
            </div>
            <script>
    jQuery('#sendOtp').click(function () {

        let mobile = jQuery('#mobile').val();

        jQuery.post('<?php echo admin_url("admin-ajax.php"); ?>', {
            action: 'send_login_otp',
            mobile: mobile
        }, function (response) {

            if (response.success) {
                jQuery('#otpSection').show();
                alert('OTP Sent');
            } else {
                alert(response.data);
            }

        });

    });
    jQuery('#verifyOtp').click(function () {

        let otp = jQuery('#otp').val();

        jQuery.post('<?php echo admin_url("admin-ajax.php"); ?>', {
            action: 'verify_login_otp',
            otp: otp
        }, function (response) {

            if (response.success) {
                window.location.href = '/catalogue/';
            } else {
                alert('Invalid OTP');
            }

        });

    });
</script>
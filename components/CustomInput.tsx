import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
const CustomInput = ({form, name, label, placeHolder}: CustomInputProps) => {
  return (
    <div>
       <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                 <div className='form-item'>
                     <FormLabel className='form-label'>
                        {label}
                     </FormLabel>
                     
                     <div className='flex flex-col w-full'>
                        <FormControl>
                            <Input 
                              placeholder={placeHolder}
                              className='input-class'
                              {...field}
                              type={name === 'password' ? 'password' : 'text'}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                 </div>
                 </div>


                )}
              />
    </div>
  )
}

export default CustomInput

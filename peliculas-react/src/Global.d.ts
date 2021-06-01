// eslint-disable-next-line @typescript-eslint/no-unsed-vars
import {StringSchema} from 'yup';

declare module 'yup'{
    class StringSchema{
        primeraLetraMayuscula():this;
    }
}
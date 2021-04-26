import unoconv from '$lib/unoconv';
import { replaceExtension, parseURL } from '$lib/utils';
import sendHook from '$lib/hook';

export default function (app) {
    app.post('/:format', async (req, res, next) => {

        const input = req.files.file[0];
        const format = req.params.format;

        if (!input) return res.error('No input file')


        const hook = req.fields.hook ? req.fields.hook[0] : false;
        const context = req.fields.context ? JSON.parse(req.fields.context[0]) : false;

        const url = hook && parseURL(hook, 'hook');
        if (hook && !url) return res.error('Invalid hook URL')

        unoconv.convert(input.path, format).then(async result => {
            const filename = replaceExtension(input.originalFilename, result.output.meta.ext);
            console.log('Convert: ' + input.originalFilename, '->', filename);

            const body = await result.output.read();
            result.input.clear();


            return hook
                ? sendHook.file(url, body, getMeta(input, result), context)
                : res.sendFile(body, filename, result.output.meta.mime)
        })
            .catch(err => {
                return hook
                    ? sendHook.error(url, err.message, getMeta(input), context)
                    : res.error(err.message)
            })

        return hook && res.end(`Converted file will be send to ${hook}`);
    });
}


function getMeta(input, result) {
    let meta = {
        input: {
            filename: input.originalFilename,
            mime: (result && result.input.meta.mime) || input.headers['content-type'],
            size: input.size,
        }
    }

    if (result) {
        meta.output = {
            filename: replaceExtension(input.originalFilename, result.output.meta.ext),
            format: result.output.meta.format,
            mime: result.output.meta.mime
        };
    }

    return meta;
}
